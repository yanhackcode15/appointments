import { IsNotEmpty, IsString, IsEmail, MinLength, IsDate } from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @IsDate()
    time: Date;
}
