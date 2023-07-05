// src/presentation/dtos/branch-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IBranch, emptyBranch } from "../../domain/models/branch";
import { nanoid } from "nanoid";

export class BranchRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  town: string;

  constructor(data: IBranch) {
    this.name = data.name;
    this.address = data.address;
    this.town = data.town
  }

  toData(): IBranch {
    return {
      ...emptyBranch,
      id: nanoid(10),
      name: this.name,
      address: this.address
    };
  }

  toUpdateData(data: IBranch): IBranch {
    return {
      id: data.id,
      name: data.name,
      address: data.address,
      town: data.town
    };
  }
}
