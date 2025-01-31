import React, { useEffect, useState } from "react";
import CardLoading from "../component/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../component/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../component/Loading";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params.search.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        // console.log(responseData, "data");
        setTotalPage(responseData.totalPage);
        setPage(responseData.page);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handlefetchMore = () => {
    if (totalPage > page) {
      setPage((preve) => preve + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold text-xl">Search Result: {data?.length}</p>

        <InfiniteScroll
          dataLength={data?.length}
          nextPage={handlefetchMore}
          hasMore={true}
          // loader={<Loading />}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5   mt-4 md:gap-4 py-4">
            {/* search data */}

            {data?.map((item, index) => {
              return <CardProduct key={index + item?._id} data={item} />;
            })}

            {/* loading data */}

            {loading &&
              loadingArrayCard.map((item, index) => {
                return <CardLoading key={index + item} />;
              })}
          </div>
        </InfiniteScroll>

        {!data[0] && !loading && (
          <div>
            <p className="font-semibold text-xl">No Data</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
