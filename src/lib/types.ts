export type User = {
  username: string;
  id: string;
};

export type UserRequestDTO = {
  username: string;
};

export type UserResponseDTO = {
  id: number;
  username: string;
};

export type RegisterResponse = {
  user: UserResponseDTO;
  token: string;
};

export type LoginResponse = {
  user: UserResponseDTO;
  token: string;
};

export type ChatRoom = {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string | null;
  password?: string;
  requiresPassword?: boolean;
};

export type CreateRoomData = {
  name: string;
  password?: string;
};

export type ErrorResponse = {
  message: string;
  errorCode?: string;
};

export type ChatMessage = {
  id: number;
  username: string;
  content: string;
  roomId: number;
  timestamp: string;
};
