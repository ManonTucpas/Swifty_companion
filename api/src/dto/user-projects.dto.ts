import { IsAlpha, IsBoolean, IsNumber } from "class-validator";

export class StudentProjectsDto {
    @IsNumber()
    project_id: number;
    @IsAlpha()
    project_name: string;
    @IsNumber()
    final_mark: number;
    @IsBoolean()
    validated: boolean;
}
