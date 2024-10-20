import { IsInt, IsOptional, IsString } from "class-validator";


export class SpellingDto {


    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxToken?: number;
}