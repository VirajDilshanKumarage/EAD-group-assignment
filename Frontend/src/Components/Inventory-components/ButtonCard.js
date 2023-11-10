import styles from "./ButtonCard.module.css";
import { BiChevronsRight } from "react-icons/bi";

const ButtonCard = (props) =>{
    return(
        <div>
            <div className={styles.aroundDiv}>
               
               <div className={styles.header}>
               <span >{props.header}</span>
               <div className={styles.iconContainer}>
                    <BiChevronsRight style={{ width: '30px', height: '30px' ,color:'#16a085' }}/>
               </div>
               </div>
               

            </div>
        </div>
    );
}

export default ButtonCard;