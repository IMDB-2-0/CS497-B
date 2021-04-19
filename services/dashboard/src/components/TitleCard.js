import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
const TitleCard = ({ title, id }) => {
    return (
        <>
        <div className="row" id = {id}>
           <div className="col-md-10 card card-body"><h2 className="mb-4">{title}</h2></div>
           <div className="col-md-1 card card-body"><Button icon = {<CloseOutlined style={{ fontSize: '32px'}} /*onClick = deleteLike*//>}></Button></div>
        </div>
        </>
    );
}

export default TitleCard;