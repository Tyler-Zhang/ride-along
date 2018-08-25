declare module 'geodist' {
  interface Coords {
    lat: number;
    lon: number;
  }

  type CalculateDist = (coordA: Coords, coordB: Coords) => number;

  const calculateDist: CalculateDist; 
  export default calculateDist;
}
