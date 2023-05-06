import { DataSource } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { Comentarios } from "src/app/model/comentarios";
import { ComentarioService } from "src/app/service/comentario.service";

@Component({
  selector: "app-usuario-sobrenosotros",
  templateUrl: "./usuario-sobrenosotros.component.html",
  styleUrls: ["./usuario-sobrenosotros.component.css"],
})
export class UsuarioSobrenosotrosComponent implements OnInit {
  lista: Comentarios[] = [];
  displayedColumns = ["nombre", "email", "comentario"];
  dataSource = new MatTableDataSource<Comentarios>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private comentarioService: ComentarioService) {
    console.log("CONSTRUCTOR LISTAR");
  }
  ngOnInit(): void {
    console.log("NGONINIT DE LISTAR");
    this.comentarioService
      .list()
      .subscribe((data) => (this.dataSource.data = data));
    /*this.comentarioService
      .list()
      .subscribe((data) => (this.dataSource = new MatTableDataSource(data)));
      */
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
