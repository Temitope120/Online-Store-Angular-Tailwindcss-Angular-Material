import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() ItemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort:string = '';
  itemsCount:number = 12;

  constructor() { }

  ngOnInit(): void {
  }


  onSortUpdated(newSort:string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count:number): void{
    this.itemsCount = count;
    this.ItemsCountChange.emit(count);
  }

  onColumnUpdate(colsNum:number): void{
    this.columnsCountChange.emit(colsNum)
  }
}
