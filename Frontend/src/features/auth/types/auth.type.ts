export type AuthMode = "login" | "register";

export type MockAccount = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResult =
  | {
      success: true;
      account: MockAccount;
    }
  | {
      success: false;
      message: string;
    };

