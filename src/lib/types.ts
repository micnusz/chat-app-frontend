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
