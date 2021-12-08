import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Categoria } from './categoria'

@Entity('produto')
export class Banco {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nome: string

  @OneToOne(() => Categoria)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria
}