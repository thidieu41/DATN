import { Button, Typography } from '@mui/material';
import Dots from '../../../../components/Dots';
import {
  BtnWrapper,
  DotsWrapper,
  GreyDiv,
  HeaderP,
  ImageWrapper,
  LeftSide,
  QuoteWrapper,
  RightSide,
  Wrapper
} from './style';

export default function Header() {
  return (
    <Wrapper
      id="trang-chu"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: ' 0 auto;',
        padding: '0px 30px'
      }}
    >
      <LeftSide
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <div>
          <Typography
            sx={{
              fontSize: 60,
              fontWeight: 700
            }}
          >
            Nha Khoa Thanh
            <br /> Sơn.
          </Typography>
          <HeaderP
            style={{
              lineHeight: 2,
              fontSize: 15,
              fontWeight: 5400
            }}
          >
            Nha khoa Thanh Sơn, được thành lập vào tháng 11/2000, dưới sự điều
            hành của bác sĩ Nguyễn Thanh Sơn, tốt nghiệp khoa Răng Hàm Mặt-Đại
            học Y dược Thành phố Hồ Chí Minh cùng với sự hướng dẫn của các giáo
            sư, tiến sĩ đi đầu của ngành Răng Hàm Mặt tại Việt Nam. Qua gần 20
            năm hoạt động và phát triển, nha khoa Thanh Sơn không chỉ tự hào với
            việc hoàn thiện nụ cười cho khách hàng mà còn góp phần giúp khách
            hàng tự tin hơn, thành công hơn trong cuộc sống. Chúng tôi, bác sĩ
            Nguyễn Thanh Sơn cùng ekip, tự hào là nha khoa uy tín, chất lượng
            chuyên môn giỏi, kinh nghiệm và chất lượng điều trị cao của thành
            phố Đà Nẵng
          </HeaderP>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper
          sx={{
            marginTop: 5,
            marginRight: 3
          }}
        >
          <img
            src={'https://nhakhoathanhson.com/user-upload/imgs/gioi-thieu.jpg'}
            alt="office"
            style={{
              zIndex: 9,
              maxWidth: 500,
              height: 600,
              objectFit: 'fill',
              borderRadius: 10
            }}
          />
          <QuoteWrapper
            sx={{
              borderRadius: 2
            }}
          >
            <div>
              <Typography
                sx={{
                  color: 'white'
                }}
              >
                <em>
                  Đem lại nụ cười, sự hài lòng cho quý khách hàng là sứ mệnh mà
                  Nha khoa Thanh Sơn đặt lên hàng đầu, đồng thời không ngừng nỗ
                  lực học hỏi cập nhật để phục vụ tất cả các vấn đề về răng
                  miệng cho người dân Đà Nẵng, miền Trung cũng như quý khách
                  hàng trong và ngoài nước.
                </em>
              </Typography>
              <Typography
                style={{
                  marginTop: '10px',
                  color: '#f1b300',
                  textAlign: 'right',
                  fontSize: 15,
                  fontWeight: 700
                }}
              >
                BS. Nguyễn Thanh Sơn
              </Typography>
            </div>
          </QuoteWrapper>
          <DotsWrapper
            sx={{
              marginRight: 1
            }}
          >
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv
          sx={{
            backgroundColor: '#f5f5f5'
          }}
        />
      </RightSide>
    </Wrapper>
  );
}
