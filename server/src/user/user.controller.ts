import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdatePartnerCardDto} from "./dto/update-partner-card.dto";
import {JwtGuard} from "../common/guards/jwt.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtGuard)
    @Post('/update')
    async updatePartnerCard(@Body() body: UpdatePartnerCardDto): Promise<any> {
        const { phone, partnerCard } = body;
        return this.userService.updatePartnerCard(partnerCard, phone);
     }
}
