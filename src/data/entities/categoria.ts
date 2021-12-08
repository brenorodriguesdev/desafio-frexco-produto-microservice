import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nome: string
}