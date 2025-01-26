import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import * as dayjs from 'dayjs';
import * as ExcelJS from 'exceljs';
import Cell from 'exceljs/index';
import { PassThrough } from 'stream';

import { OrderEntity } from '../../../database/entities';

@Injectable()
export class ExportFileService {
  async generateExcel(data: OrderEntity[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    this.createHeader(worksheet);
    this.styleHeader(worksheet);
    this.insertData(worksheet, data);
    return await this.createBuffer(workbook);
  }

  public getCurrentDate(): string {
    return dayjs().format('YYYY-MM-DD').toString();
  }

  private createHeader(worksheet: ExcelJS.Worksheet): void {
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
    worksheet.columns = [
      { header: 'id', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Age', key: 'age', width: 5 },
      { header: 'Course', key: 'course', width: 10 },
      { header: 'Course Format', key: 'course_format', width: 15 },
      { header: 'Course Type', key: 'course_type', width: 15 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Sum', key: 'sum', width: 10 },
      { header: 'Already paid', key: 'alreadyPaid', width: 15 },
      { header: 'Created', key: 'created_at', width: 13 },
      { header: 'group', key: 'group', width: 10 },
      { header: 'manager', key: 'manager', width: 13 },
    ];
  }

  private styleHeader(worksheet: ExcelJS.Worksheet): void {
    const row: ExcelJS.Row = worksheet.getRow(1);
    row.height = 25;
    row.alignment = { vertical: 'middle', horizontal: 'center' };
    row.eachCell((cell: Cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '3F9129' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
        size: 12,
      };
    });
  }

  private insertData(worksheet: ExcelJS.Worksheet, data: OrderEntity[]): void {
    data.forEach((item: OrderEntity) => {
      const row: ExcelJS.Row = worksheet.addRow({
        id: item.id,
        name: item.name || 'no data',
        surname: item.surname || 'no data',
        email: item.email || 'no data',
        phone: item.phone || 'no data',
        age: item.age || 'no data',
        course: item.course || 'no data',
        course_format: item.course_format || 'no data',
        course_type: item.course_type || 'no data',
        status: item.status || 'no data',
        sum: item.sum || 'no data',
        alreadyPaid: item.alreadyPaid || 'no data',
        created_at: item.created_at || 'no data',
        group: item.group?.name || 'no group',
        manager: item.manager?.surname || 'no manager',
      });
      row.alignment = { vertical: 'middle', horizontal: 'center' };
      row.eachCell({ includeEmpty: true }, (cell: Cell, colIndex: number) => {
        if (colIndex >= 1 || colIndex <= worksheet.columns.length) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });
      row.height = 20;
    });
  }

  private async createBuffer(workbook: ExcelJS.Workbook): Promise<Buffer> {
    const stream = new PassThrough();
    const chunks: Buffer[] = [];
    stream.on('data', (chunk): number => chunks.push(chunk));
    await workbook.xlsx.write(stream);
    stream.end();
    return Buffer.concat(chunks);
  }
}
