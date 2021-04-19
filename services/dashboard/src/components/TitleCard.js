import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {deleteLiked} from '../redux/actions/movieActions';
const TitleCard = ({ title, id, movieID }) => {
    
    return (
        <>
        <div className="row" onClick = {() => {deleteLiked(id, movieID);}}>
           <div className="col-md-10 card card-body"><h2 className="mb-4">{title}</h2></div>
        </div>
        </>
    );
}


export default TitleCard;