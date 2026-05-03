import Image from "next/image";
import styles from "./style.module.css";

import Img from "@/public/images/spinner.svg";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <Image
        src={Img}
        alt="لوگو قادری"
        width={200}
        height={200}
        className="screen800:w-44 screen550:w-32"
      />

      <div className={styles.dots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default Spinner;
