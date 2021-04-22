import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { IClusterRequest } from 'src/app/api/models/cluster-request.model';
import { ClusterBinaryStar } from 'src/app/api/models/clustered-binary-star.model';
import { QueryService } from '../../api/query.service';
import { ClusteredData, GraphType } from './clusteredData';
import { ConfigureGraphComponent } from './configure-graph/configure-graph.component';

// PlotlyModule.plotlyjs = Plotly;

//TODO: Loading screen during query, or hide 2d graph while loading

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  public graph2D;
  public graph3D;
  selectedCluster: string;

  private data3D: any;
  public clusteredData: ClusteredData;
  public GraphTypeEnum = GraphType;

  constructor(
    private queryService: QueryService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryService.getInterpolatedData().subscribe((response) => {
      console.log('interpolated data');
      console.log(response);
    });

    this.selectedCluster = 'all';
    this.data3D = null;
    this.graph2D = {
      data: null,
      layout: {
        width: 640,
        height: 480,
        title: '2D Cluster Visualization',
        xaxis: {
          title: '',
          type: 'linear',
          zeroline: false,
        },
        yaxis: {
          title: '',
          type: 'linear',
          zeroline: false,
        },
      },
    };
    this.graph3D = {
      data: this.data3D,
      layout: {
        autosize: true,
        width: window.innerWidth * 0.7, //640,
        height: window.innerHeight * 0.7, //480,
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 1,
          },
          camera: {
            center: {
              x: 0,
              y: 0,
              z: 0,
            },
            eye: {
              x: 1.5,
              y: 1.5,
              z: 1.5,
            },
            up: {
              x: 0,
              y: 0,
              z: 1,
            },
          },
          xaxis: {
            title: '',
            type: 'linear',
            zeroline: false,
          },
          yaxis: {
            title: '',
            type: 'linear',
            zeroline: false,
          },
          zaxis: {
            title: '',
            type: 'linear',
            zeroline: false,
          },
        },
        title: '3D Cluster Visualization',
      },
    };
    this.getBackendDataTest();
  }

  getBackendDataTest(): void {
    this.route.queryParams
      .pipe(
        concatMap((queryParams) =>
          this.queryService.fromQueryParamsAsync(queryParams)
        ),
        concatMap((body: IClusterRequest) => {
          return this.queryService.postQuery(body);
        })
      )
      .subscribe((response: ClusterBinaryStar[]) => {
        console.log('API response');
        console.log(response);
        if (response === null) {
          return;
        }
        this.clusteredData = new ClusteredData(response);

        //Set to 3D graph by default
        this.clusteredData.graphType = GraphType.Graph_3D;
        this.clusteredData.setSelectedAttributes(
          this.clusteredData.getAllAttr()
        );
        this.graph3D['data'] = this.clusteredData.getGraphData();

        //Label axis
        this.graph3D.layout.scene.xaxis.title = this.clusteredData.selectedAttributes[0];
        this.graph3D.layout.scene.yaxis.title = this.clusteredData.selectedAttributes[1];
        this.graph3D.layout.scene.zaxis.title = this.clusteredData.selectedAttributes[2];
      });
  }

  configureGraph(): void {
    let dialogRef = this.dialog.open(ConfigureGraphComponent, {
      data: {
        attrs: this.clusteredData.getAllAttr(),
        graphType: this.clusteredData.graphType,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.clusteredData.graphType = data['graphType'];
      this.clusteredData.setSelectedAttributes(data['attrs']);

      if (this.clusteredData.graphType == GraphType.Graph_2D) {
        this.graph2D['data'] = this.clusteredData.getGraphData();

        //Label axis
        this.graph2D.layout.xaxis.title = this.clusteredData.selectedAttributes[0];
        this.graph2D.layout.yaxis.title = this.clusteredData.selectedAttributes[1];
      } else if (this.clusteredData.graphType == GraphType.Graph_3D) {
        this.graph3D['data'] = this.clusteredData.getGraphData();

        //Label axis
        this.graph3D.layout.scene.xaxis.title = this.clusteredData.selectedAttributes[0];
        this.graph3D.layout.scene.yaxis.title = this.clusteredData.selectedAttributes[1];
        this.graph3D.layout.scene.zaxis.title = this.clusteredData.selectedAttributes[2];
      } else if (this.clusteredData.graphType == GraphType.Graph_1D) {
        this.graph2D['data'] = this.clusteredData.getGraphData();

        //Label axis
        this.graph2D.layout.xaxis.title = 'time';
        this.graph2D.layout.yaxis.title = this.clusteredData.selectedAttributes[0];
      }
    });
  }
}
