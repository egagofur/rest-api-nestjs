import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  getAllUser() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  getUserById(@Body() id: number) {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments')
  getCommentUserById(@Param() id: string) {
    return this.commentService.findUserComment(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    try {
      return this.userService.createUser(createUser);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUser);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
