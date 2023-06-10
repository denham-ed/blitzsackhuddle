const mongoose = require('mongoose');
const connectDB = require('./db');

// Mock the console.log function
console.log = jest.fn();

describe('connectDB', () => {
  let originalConnect;
  const mockMongoUri = "mock-host"

  beforeAll(() => {
    originalConnect = mongoose.connect;
    mongoose.connect = jest.fn(() => ({
      connection: {
        host: 'mock-host',
      },
    }));
  });

  afterAll(() => {
    mongoose.connect = originalConnect;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB successfully', async () => {
    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(mockMongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    expect(console.log).toHaveBeenCalledWith('MongoDB connected: mock-host');
  });

  it('should log an error and exit the process if MongoDB connection fails', async () => {
    const mockErrorMessage = 'Failed to connect to MongoDB';
    mongoose.connect = jest.fn(() => {
      throw new Error(mockErrorMessage);
    });

    process.exit = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(mockMongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    expect(console.log).toHaveBeenCalledWith(`Error: ${mockErrorMessage}`);
    expect(process.exit).toHaveBeenCalled();
  });
});
