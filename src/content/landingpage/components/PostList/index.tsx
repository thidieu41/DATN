import { Box, Stack, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RecipeReviewCard from 'src/components/CardPost';
import { IPostProps } from 'src/interface/posts';
import { createClient } from 'src/utils/axios';
import { ICategoryProps } from 'src/utils/schema';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export const BoxCompo = styled(Box)(
  () => `
     height: 190px;
     display:flex,
    `
);

const PostListComponent = () => {
  const [postList, setPostList] = useState<IPostProps[]>([]);
  const [categoryList, setCategory] = useState<{
    [key: number]: ICategoryProps;
  }>({});

  const axios = createClient();

  const handleCategoryList = (data: ICategoryProps[]) => {
    const list = data.reduce((obj, item: ICategoryProps) => {
      obj = {
        ...obj,
        [item.id]: item
      };
      return obj;
    }, {});
    setCategory(list);
  };

  const handleGetPostListData = async (isPost) => {
    await axios
      .get(isPost ? `post/posts/` : 'post/categories/')
      .then((res) => {
        if (isPost) {
          setPostList(res.data.results);
        } else {
          handleCategoryList(res.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  useEffect(() => {
    handleGetPostListData(true);
    handleGetPostListData(false);
  }, []);
  return (
    <Box
      sx={{
        mx: 10,
        my: 5
      }}
      id="bai-viet"
    >
      <Stack>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 600,
            mb: 5
          }}
        >
          Bài Viết
        </Typography>
      </Stack>

      <Carousel responsive={responsive}>
        {postList.map((item: IPostProps, key) => (
          <Stack
            key={key}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 2
            }}
          >
            <RecipeReviewCard
              data={item}
              categoryName={categoryList[item?.category]?.name || ''}
            />
          </Stack>
        ))}
      </Carousel>
    </Box>
  );
};

export default PostListComponent;
