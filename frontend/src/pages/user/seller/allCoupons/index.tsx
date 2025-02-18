import CouponItem from '@components/CouponItem';
import { Col, Row } from 'react-bootstrap';
import couponData from '@pages/coupon/couponData.json';
import TButton from '@components/TButton';

interface CouponProps {
  id: number;
  type: 'percentage' | 'fixed' | 'shipping';
  name: string;
  description: string;
  discount: number;
  start_date: string;
  expire_date: string;
  tags: {
    name: string;
  }[];
}

const ManageSellerCoupons = () => {
  return (
    <div>
      <Row>
        {/* display title for desktop */}
        <div className='disappear_phone disappear_tablet'>
          <Row>
            <Col xl={6} className='left'>
              <div className='title'>All Global Coupon</div>
            </Col>
            <Col xl={3} />
            <Col xl={3} className='right'>
              <TButton text='New Coupon' action='/user/seller/manageCoupons/new' />
            </Col>
          </Row>
        </div>
        {/* display title for tablet */}
        <div className='disappear_desktop disappear_phone'>
          <Row>
            <Col md={8} className='left'>
              <div className='title'>All Global Coupon</div>
            </Col>
            <Col md={4} className='right'>
              <TButton text='New Coupon' action='/user/seller/manageCoupons/new' />
            </Col>
          </Row>
        </div>
        {/* display title for phone */}
        <div className='disappear_desktop disappear_tablet'>
          <Row>
            <Col xs={12} className='center' style={{ padding: '0' }}>
              <div className='title'>All Global Coupon</div>
            </Col>
            <Col />
            <Col xs={6} className='center' style={{ padding: '0 0 2% 0' }}>
              <TButton text='New Coupon' action='/user/seller/manageCoupons/new' />
            </Col>
            <Col />
          </Row>
        </div>

        <hr className='hr' />
        <Row>
          <div className='disappear_phone'>
            <Row>
              {couponData.map((data, index) => {
                return (
                  <Col md={6} xl={4} key={index} style={{ padding: '2%' }}>
                    <CouponItem data={data as CouponProps} />
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className='disappear_desktop disappear_tablet'>
            <Row>
              {couponData.map((data, index) => {
                return (
                  <Col xs={12} key={index} style={{ padding: '2% 10%' }}>
                    <CouponItem data={data as CouponProps} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default ManageSellerCoupons;
