import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Message Service', () => {
  const mockUser = { _id: new mongoose.Types.ObjectId().toString(), name: 'John Doe', email: 'john@example.com' };
  const mockToken = 'mock-jwt-token';

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        status: 'success',
        data: { user: mockUser },
      },
    });
  });

  it('should send a message successfully', async () => {
    const recipientId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .post('/api/v1/messages/send')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        recipientId,
        text: 'Hello there!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toHaveProperty('text', 'Hello there!');
    expect(res.body.data.message).toHaveProperty('senderId', mockUser._id);
  });

  it('should return 401 if unauthorized', async () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 401 } });

    const res = await request(app)
      .get('/api/v1/conversations')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.statusCode).toEqual(401);
  });
});
