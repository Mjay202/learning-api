import { UserRecord } from "src/types/user.type";
import { User } from "src/users/entities/user.entity";

export const mapUserDataToResponse = (user: User): UserRecord => {
        const { password, ...userSafeRecord } = user;
        return userSafeRecord;   
}