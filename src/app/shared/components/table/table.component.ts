import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> {
  /**
   * Data to be displayed in the table.
   */
  @Input() public data: T[];

  /**
   * The total number of items.
   */
  @Input() public total: number;

  /**
   * Columns to be displayed in the table.
   */
  @Input() public columns: string[];

  /**
   * The single item text to display in the footer.
   */
  @Input() public dataSingleText: string;

  /**
   * The plural item text to display in the footer.
   */
  @Input() public dataPluralText: string;

  /**
   * The item template.
   */
  @ContentChild(TemplateRef) public itemTemplate!: TemplateRef<{ $implicit: T }>;

  constructor() {
    this.data = [];
    this.columns = [];
    this.total = 0;
    this.dataSingleText = 'producto';
    this.dataPluralText = 'productos';
  }

  /**
   * The track by function for the ngFor directive.
   *
   * @param _index The index of the element.
   * @param item The item object.
   */
  public trackByFunction(_index: number, item: any): string {
    return item.id;
  }
}
