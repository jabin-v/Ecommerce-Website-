import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/filter/filterSlice";
import styles from "./styles.module.css";

const Pagination = ({ total, limit}) => {

    const dispatch=useDispatch();
	const totalPages = Math.ceil(total / limit);

    

    const page=useSelector((state)=>state.filter.page)

	const onClick = (newPage) => {

       

        dispatch(setPage(newPage + 1))
		
	};

	return (
		<div className={styles.pageContainer}>
			{totalPages > 1 &&
				[...Array(totalPages)].map((val, index) => (
					<button
						onClick={() => onClick(index)}
						className={
							page === index + 1
								? `${styles.page_btn} ${styles.active}`
								: styles.page_btn
						}
						key={index}
					>
						{index + 1}
					</button>
				))}
		</div>
	);
};

export default Pagination;