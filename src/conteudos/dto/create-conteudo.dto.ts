import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsObject,
  IsArray,
} from 'class-validator';

export class CreateConteudoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  blocos?: any;

  @IsNumber()
  @IsOptional()
  semanaApresentacao?: number;

  @IsString()
  @IsOptional()
  fase?: string;

  @IsString()
  @IsOptional()
  nivelRisco?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  referenciaMaterial?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  condicaoEnvio?: string;
  
  @IsString()
  @IsOptional()
  autorId?: string;

  @IsString()
  @IsOptional()
  autorEmail?: string;
}
