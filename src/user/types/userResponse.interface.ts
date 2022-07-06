import { UserType } from "./user.types";

export interface userResponseInterface {
    user: UserType & { token: string };
}