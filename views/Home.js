import { Badge, Box, Button, CheckIcon, Divider, FormControl, HStack, Icon, Image, Input, Select, Stack, Text, View, VStack, WarningOutlineIcon } from 'native-base'
import React from 'react'
import gpayImg from './../assets/google-pay-512.png';
import cashImg from './../assets/money-512.png';
import paytmImg from './../assets/paytm-512.png';
import phonepeImg from './../assets/phonepe-512.png';
import { FontAwesome } from '@expo/vector-icons';
import create from 'zustand'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const date = moment()

const width = Dimensions.get('screen').width;


export default function Home() {
  const useStore = create((set) => ({
    paidFor: ['Bmtc', 'Food', 'Rapido']
  }))

  const paidForStore = useStore(state => state.paidFor)
  console.log('APP :: date :: ', date);
  console.log('APP :: moment :: ', moment().format('Do-MMM-YY'));

  return (
    <>
    <View style={{
            display: 'flex',
            justifyContent: 'space-evenly', flexDirection: 'row',
          }}>
          <View bg={'yellow.200'}>
            <Image resizeMode='contain' w={0.2 * width} h={0.07 * Dimensions.get('screen').height} source={gpayImg} />
          </View>
          <View bg={'yellow.200'}>
            <Image resizeMode='contain' w={0.2 * width} h={0.07 * Dimensions.get('screen').height} source={paytmImg} />
          </View>
          <View bg={'yellow.200'}>
            <Image resizeMode='contain' w={0.2 * width} h={0.07 * Dimensions.get('screen').height} source={phonepeImg} />
          </View>
          <View bg={'yellow.200'}>
            <Image resizeMode='contain' w={0.2 * width} h={0.07 * Dimensions.get('screen').height} source={cashImg} />
          </View>
          </View>
        
    <VStack>
      <Box>
        <VStack>
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Amount</FormControl.Label>
              <Input w={{
                base: "75%",
                md: "25%"
              }} InputLeftElement={<Icon as={<FontAwesome name="rupee" />} size={5} ml="2" color="muted.400" />} placeholder="100"
              />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          
          <HStack space={4} w='full' justifyContent='space-evenly' >
           
          </HStack>
          <FormControl w="3/4" maxW="300" isRequired isInvalid>
            <FormControl.Label>Choose service</FormControl.Label>
            <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />
            }} mt="1">
              {paidForStore.map(paid => <Select.Item label={paid} value={paid} />)}
            </Select>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <Box>
            <HStack space={3} >
              <Badge rounded='5' px='2' colorScheme="success">SUCCESS</Badge>
              <Badge rounded='5' px='2' colorScheme="success">SUCCESS</Badge>
              <Badge rounded='5' px='2' colorScheme="success">SUCCESS</Badge>
            </HStack>
            <Divider />
            <Text>
              Quick suggestions
            </Text>
            <HStack space={4}>
              <Badge variant='outline' rounded='5' px='2' >Bus</Badge>
              <Badge variant='outline' rounded='5' px='2' >Ola</Badge>
              <Badge variant='outline' rounded='5' px='2' >Food</Badge>
              <Badge variant='outline' rounded='5' px='2' >Rapido</Badge>
              <Badge variant='outline' rounded='5' px='2' >Shop</Badge>
            </HStack>
          </Box>
          <FormControl>
            <Stack mx="4">
              <FormControl.Label>Title</FormControl.Label>
              <Input w={{
                base: "75%",
                md: "25%"
              }} InputLeftElement={<Icon as={<MaterialIcons name="title" />} size={5} ml="2" color="muted.400" />} placeholder="100"
              />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <HStack justifyContent='space-around' mx={5}>
            <HStack>
              <MaterialIcons name="date-range" size={24} color="black" />
              <Text>
                {moment().format('Do-MMM-YY')}
              </Text>
            </HStack>
            <HStack>
              <AntDesign name="clockcircleo" size={24} color="black" />
              <Text>  {moment().format('h:mm:a')}</Text>
            </HStack>
          </HStack>
          <HStack>
            <Ionicons name="add" size={24} color="black" />
            <Text>
              More Options
            </Text>
          </HStack>
          <Button>
            Add
          </Button>
        </VStack>
      </Box>

    </VStack>
    </>
  )
}
