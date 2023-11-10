import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import ButtonCard from '../Components/Inventory-components/ButtonCard';
import styles from "./Css/InventoryDashbord.module.css"
import { BrowserRouter as  Navigate, Link } from 'react-router-dom';
import  imageInventory from '../Asset/Inventory.png';

const InventoryDashboard = () => {
  return (
    // <div>
    //   <NavBar/>
    //   <div style={{marginTop:'40px'}}>
    //   <div className={styles.image}>
    //       <img src={imageInventory} width="100px"/>
    //   </div>
    //   <h2>Manage Products</h2>
    //   </div>
    //   {/* Add your admin dashboard content here */}
    //   <div className={styles.aroundContainer}>
    //     <div className ={styles.buttonAroundContainer}>
    //       <Link to='/add-new-product'  className={styles.noUnderline}>
    //       <div>
    //         <ButtonCard header="Add new product to stock"/>
    //       </div>
    //       </Link>
    //       <Link to='/view-edit-products'  className={styles.noUnderline}>

    //       <div>
    //         <ButtonCard header="View all and edit product"/>
    //       </div>
    //       </Link>
    //     </div>
    //   </div>
     
    // </div>

    <div>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.imageContainer}>
          <img src={imageInventory} width="500px" alt="Inventory" />
        </div>
        <div className={styles.contentContainer}>
          <h2 style={{color:'green'}}>Manage Products</h2>
          <div className={styles.aroundContainer}>
            <div className={styles.buttonAroundContainer}>
            <Link to='/add-new-product'  className={styles.noUnderline}>
              <div>
                <ButtonCard header="Add new product to stock" />
              </div>
            </Link>
            </div>
            <div className={styles.aroundContainer}>
            <Link to='/view-edit-products'  className={styles.noUnderline}>
            <div>
                <ButtonCard header="View all and edit product" />
              </div>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default InventoryDashboard;