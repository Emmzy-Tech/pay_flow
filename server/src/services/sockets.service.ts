import { configs } from '@/configs';
import { tempStore } from '@/constants';
import { UnauthorizedException } from '@dolphjs/dolph/common';
import { mongoose } from '@dolphjs/dolph/packages';
import { logger, verifyJWTwithHMAC } from '@dolphjs/dolph/utilities';
import { Server } from 'socket.io';

const users = new Map();

const registerUser = (userId: mongoose.Schema.Types.ObjectId, clientId: string) => {
  if (!users.has(userId.toString())) {
    users.set(userId.toString(), clientId);
  }
};

const removeUser = (userId: mongoose.Schema.Types.ObjectId) => {
  return users.delete(userId.toString());
};

const getUser = (userId: any) => {
  return users.get(userId.toString());
};

const authenticate = (client: any, next: any) => {
  const { token } = client.handshake.query;

  try {
    if (!token) return next(new UnauthorizedException('you cannot access this resource without auth token'));

    const decodeToken = async () => {
      const decodeToken = await verifyJWTwithHMAC({ token, secret: configs.jwt.secret });

      logger.info(decodeToken);
      client.data.user = { id: decodeToken.sub };
      return next();
    };
    decodeToken();
  } catch (e) {
    const errors = ['TokenExpiredError', 'NotBeforeError', 'JsonWebTokenError'];
    if (errors.includes(e.name)) {
      return next(new UnauthorizedException('please authenticate'));
    }
    next(e);
  }
};

export const getIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  io.use(authenticate);
  io.on('connection', async (client) => {
    const { id } = client.data.user;
    registerUser(id, client.id);

    io.emit('user_id', client.id);

    setInterval(() => {
      while (tempStore.length) {
        const notification = tempStore.shift();
        const userClient = getUser(notification.userId);
        if (userClient) {
          io.sockets.to(userClient).emit('new-notification', notification);
        }
      }
    }, 1000);

    client.on('disconnect', () => {
      io.emit('user_id', client.id);
      removeUser(client.data.user.id);
    });
  });
};
