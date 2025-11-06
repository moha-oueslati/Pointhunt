import { Text} from "react-native";


export default function PointInfo({ data, ndex}:{
  data: { mission: string; points: number };
  ndex: number;
}){
    return(
        <div>
            <input type="checkbox" name="checker"/>
            <span><Text>{ndex}</Text><Text> {data.mission} <input type="checkbox" name="star" /></Text></span>
            <p>{data.points} Poäng</p>
        </div>
    );
}