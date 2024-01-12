import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SubTitle, Title } from './styles';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useLocation } from 'react-router-dom';
import { IService, servicesList } from '../data';

const ServicesDetailsCom = () => {
  const location = useLocation();
  const { pathname } = location;
  const [_, url, idService] = pathname.split('/');
  const [detailsInformation, setDetailsInformation] = useState<IService>();

  useEffect(() => {
    const data = servicesList.find((item) => item.id === Number(idService));
    setDetailsInformation(data);
  }, [servicesList, idService]);

  return (
    <Stack>
      <Title>{detailsInformation?.title || ''}</Title>
      <Divider
        sx={{
          backgroundColor: '#308a79'
        }}
      />
      <Stack spacing={2} sx={{ mt: 3 }}>
        {(detailsInformation?.subdata || []).map((item, key) => (
          <Stack key={key} spacing={2}>
            {item?.subtitle && <SubTitle>{item?.subtitle || ''}</SubTitle>}
            {item?.subContent && (
              <Typography
                sx={{
                  lineHeight: 2
                }}
              >
                {item?.subContent || ''}
              </Typography>
            )}
            {item?.listContent && (
              <List>
                {(item?.listContent || []).map((itemList, itemKey) => (
                  <ListItem key={itemKey}>
                    <ListItemIcon>
                      <CircleOutlinedIcon
                        fontSize="small"
                        sx={{
                          maxWidth: 10
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={itemList} />
                  </ListItem>
                ))}
              </List>
            )}

            {item.subImg && (
              <img
                src={item.subImg}
                style={{
                  maxHeight: 400,
                  maxWidth: 600,
                  margin: 'auto'
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ServicesDetailsCom;
