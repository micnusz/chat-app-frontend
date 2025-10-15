export type User = {
  username: string;
  id: string;
};

// Dane przychodzące w requestach
export type UserRequestDTO = {
  username: string;
};

// Dane wysyłane do frontendu
export type UserResponseDTO = {
  id: number;
  username: string;
};

export type ChatRoom = {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string | null;
  password?: string;
};
