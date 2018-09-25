export class GraphFormat {
  nodes: Vertex[]=[];
  edges: Edge[]=[];
}

export class Vertex {
  id: string;
  x: number;
  y: number;
  
}

export class Edge {
  source: string;
  target: string;
  weight: number;
}
