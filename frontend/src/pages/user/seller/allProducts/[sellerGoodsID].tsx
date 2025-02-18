import '@style/global.css';

import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import TButton from '@components/TButton';
import InfoItem from '@components/InfoItem';

import goodsData from '@pages/discover/goodsData.json';

interface Tag {
  name: string;
}

interface Props {
  id: number | null;
  price: number;
  name: string;
  introduction: string;
  sub_title: string;
  sub_content: string;
  calories: string;
  due_date: string;
  ingredients: string;
  image_url: string;
  tags: Tag[];
  quantity: number;
}

const EachSellerGoods = () => {
  // to find the specific goods
  const params = useParams();
  const id = params.goods_id;

  const data: Props = {
    id: null,
    price: 0,
    name: '',
    introduction: '',
    sub_title: '',
    sub_content: '',
    calories: '',
    due_date: '',
    ingredients: '',
    image_url: '',
    tags: [],
    quantity: 0,
  };

  const foundGoods = goodsData.find((goods) => goods.id.toString() === id);

  if (foundGoods) {
    Object.assign(data, foundGoods);
    console.log(data.tags);
  }

  // define the tag style
  const tagStyle = {
    borderRadius: '30px',
    background: ' var(--button_light)',
    padding: '1% 1% 1% 3%',
    color: 'white',
    margin: '5px 0 5px 5px',
    width: '100%',
  };

  const [tag, setTag] = useState('');
  const [tagContainer, setTagContainer] = useState<string[]>(data.tags.map((tag) => tag.name));
  const [modification, setModification] = useState<boolean[]>(Array(data.tags.length).fill(false));
  const [file, setFile] = useState<string | null>(data.image_url);
  const [name, setName] = useState<string>(data.name);
  const [price, setPrice] = useState<string>(data.price.toString());
  const [quantity, setQuality] = useState<string>(data.quantity.toString());
  const [introduction, setIntroduction] = useState<string>(data.introduction);
  const [BBD, setBBD] = useState<string>(data.due_date);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  const addNewTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // this addressed the magic number: https://github.com/facebook/react/issues/14512
    if (event.keyCode === 229) return;

    if (event.key === 'Enter') {
      const input = event.currentTarget.value.trim();
      console.log(event.currentTarget.value);

      if (input !== '') {
        setTagContainer((prevTags) => [...prevTags, input]);
        setModification((prevModification) => [...prevModification, false]);
        setTag('');
      }
      console.log(tagContainer, modification);
    }
  };

  const deleteTag = (index: number) => {
    setTagContainer((prevTags) => prevTags.filter((_, i) => i !== index));
    setModification((prevModifications) => prevModifications.filter((_, i) => i !== index));
  };

  const changeModification = (index: number) => {
    setModification((prevModifications) =>
      prevModifications.map((mod, i) => (i === index ? !mod : mod)),
    );
  };

  const changeTag = (index: number, value: string) => {
    setTagContainer((prevTags) => prevTags.map((tag, i) => (i === index ? value : tag)));
  };

  console.log(tagContainer);

  return (
    <div style={{ padding: '55px 12% 0 12%' }}>
      <Row>
        <Col xs={12} md={5} className='goods_bgW'>
          <div className='flex_wrapper' style={{ padding: '0 8% 10% 8%' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '0 0 30px 0',
              }}
            >
              <div
                className='center'
                style={{ backgroundColor: 'black', borderRadius: '0 0 30px 0' }}
              >
                {file ? (
                  <div>
                    <img
                      src={file}
                      alt='File preview'
                      style={{ width: '100%', height: '100%', borderRadius: '0 0 30px 0' }}
                    />
                  </div>
                ) : (
                  <div style={{ padding: '30% 5% 30% 5%' }}>
                    <FontAwesomeIcon icon={faFileUpload} size='6x' />
                  </div>
                )}
              </div>
              <br />
              <Row
                style={{
                  position: 'absolute',
                  zIndex: '1',
                  right: '0px',
                  bottom: '40px',
                }}
              >
                <Col xs={9}></Col>
                <Col xs={3}>
                  <form method='post' encType='multipart/form-data'>
                    <label
                      htmlFor='file'
                      className='custom-file-upload'
                      style={{ minWidth: '40px' }}
                    >
                      <div className='button pointer center' style={{ padding: '10px' }}>
                        <FontAwesomeIcon icon={faPen} className='white_word' />
                      </div>
                    </label>

                    <input
                      id='file'
                      name='file'
                      type='file'
                      style={{ display: 'none' }}
                      onChange={uploadFile}
                    />
                  </form>
                </Col>
              </Row>
            </div>
            <br />
            <span className='dark'>add more tags</span>

            <input
              type='text'
              placeholder='Input tags'
              className='quantity_box'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={addNewTag}
              style={{ marginBottom: '10px' }}
            />

            <Row xs='auto'>
              {tagContainer.map((currentTag, index) => (
                <Col style={tagStyle} key={index} className='center'>
                  <Row style={{ width: '100%' }} className='center'>
                    <Col xs={1} className='center'>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='white_word pointer'
                        onClick={() => deleteTag(index)}
                      />
                    </Col>
                    <Col xs={1} className='center'>
                      <FontAwesomeIcon
                        icon={faPen}
                        className='white_word pointer'
                        onClick={() => changeModification(index)}
                      />
                    </Col>
                    <Col xs={8} lg={10}>
                      {modification[index] ? (
                        <input
                          type='text'
                          placeholder={currentTag}
                          value={currentTag}
                          onChange={(e) => changeTag(index, e.target.value)}
                          style={{
                            border: 'var(--bg) 1px solid',
                            borderRadius: '30px',
                            padding: '0 10px 0 10px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            width: '100%',
                          }}
                        />
                      ) : (
                        <span style={{ wordBreak: 'break-all' }}>{currentTag}</span>
                      )}
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>

            <div style={{ height: '50px' }} />
            <TButton text='Delete Product' />
            <TButton text='Confirm Changes' />
          </div>
        </Col>
        <Col xs={12} md={7}>
          <div style={{ padding: '7% 0% 7% 0%' }}>
            <InfoItem text='Product Name' isMore={false} value={name} setValue={setName} />
            <InfoItem text='Product Price' isMore={false} value={price} setValue={setPrice} />
            <InfoItem
              text='Product Quantity'
              isMore={false}
              value={quantity}
              setValue={setQuality}
            />
            <InfoItem
              text='Product Introduction'
              isMore={true}
              value={introduction}
              setValue={setIntroduction}
            />
            <InfoItem text='Best Before Date' isMore={true} value={BBD} setValue={setBBD} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EachSellerGoods;
