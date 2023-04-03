import { Cell } from '../cell';
import { Colors } from '../colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/king-black.png';
import whiteLogo from '../../assets/king-white.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    if ((dx === 1 && dy === 1) || (dx === 1 && dy === 1)) {
      return true;
    }
    if (this.cell.isEmptyVertical(target) && target.y === this.cell.y + 1) {
      return true;
    }
    if (this.cell.isEmptyVertical(target) && target.y === this.cell.y - 1) {
      return true;
    }
    if (this.cell.isEmptyHorizontal(target) && target.x === this.cell.x - 1) {
      return true;
    }
    if (this.cell.isEmptyHorizontal(target) && target.x === this.cell.x + 1) {
      return true;
    }

    return false;
  }
}
