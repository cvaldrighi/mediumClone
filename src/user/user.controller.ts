import { Body, Controller, Get, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "@app/user/dto/createUser.dto";
import { userResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { User } from "./decorators/user.decorator";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { BackendValidationPipe } from "@app/shared/pipes/backendValidation.pipe";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('users')
    @UsePipes(new BackendValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<userResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new BackendValidationPipe())
    async login(@Body('user') loginDto: LoginUserDto): Promise<userResponseInterface> {
        const user = await this.userService.login(loginDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User('id') userId: number): Promise<userResponseInterface> {
        return this.userService.buildUserResponse(await this.userService.findById(userId));
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<userResponseInterface> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto);
        return this.userService.buildUserResponse(user);
    }
}