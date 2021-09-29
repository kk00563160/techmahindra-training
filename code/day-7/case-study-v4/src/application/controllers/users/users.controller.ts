import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { FindUserByNameAdapter } from 'src/application/adapters/finduserbyname.adapter';
import { AddUserCommand } from 'src/application/commands/add-user.command';
import { UpdateUserCommand } from 'src/application/commands/update-user.command';
import { SerializerInterceptor } from 'src/application/interceptors/serializer.interceptor';

@Controller('auth')
export class UsersController {
    constructor(private findUserByNameAdapter: FindUserByNameAdapter) {
        console.log('users controller created')
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(SerializerInterceptor)
    @Get('/user/:username')
    fetchUserByUserName(@Param('username') name: string) {
        console.log('users fetch API called')
        return this.findUserByNameAdapter.handler(name)
    }

    @Get('/admin/user/:username')
    fetchUserByUserNameAdmin(@Param('username') name: string) {
        console.log('users admin fetch API called')
        return this.findUserByNameAdapter.handler(name)
    }

    @Post('/signup')
    addUser(@Body() user: AddUserCommand) {
        console.log(user)
        return user
    }

    @Patch('/update/:username')
    updateUser(@Param('username') username: string, @Body() user: UpdateUserCommand) {
        console.log(user)
        return user
    }

    @Delete('/delete')
    deleteUser(@Query('username') username: string) {
        console.log(username)
        return username
    }
}

/**
 *

    // @Get()
    // sample(@Req() req: Request, @Res() res: Response) {
    //     //   console.log(req.)
    //     return res.status
    // }
    // @Get('/some/:data')
    // getData(@Param('data', ParseIntPipe) val: number) {
    //     console.log(typeof val)
    //     return val
    // }
 */


