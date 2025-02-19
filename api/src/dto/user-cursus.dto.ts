import { IsNumber } from "class-validator";
import { StudentSkillsDto } from "./user-skills.dto";

export class StudentCursusDto {
    @IsNumber()
    id: number;
    @IsNumber()
    level: number;
    @IsNumber()
    percentage: number;
    skills?: StudentSkillsDto[];
}
