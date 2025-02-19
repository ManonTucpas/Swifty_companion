import { IsAlpha, IsNumber } from "class-validator";

export class StudentSkillsDto {
    @IsNumber()
    id: number;
    @IsAlpha()
    name: string;
    @IsNumber()
    level: number;
}
