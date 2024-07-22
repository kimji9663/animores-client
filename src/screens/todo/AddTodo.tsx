import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { PetService } from "../../service/PetService";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../statics/constants/Querykey";
import Title from "../../components/text/Title";
import ToDoType from "../../statics/constants/ToDoType";
import { Controller, Form, FormProvider, set, useController, useFieldArray, useForm } from "react-hook-form";
import { commonStyles } from "../../styles/commonStyles";

interface IPet {
  id: number;
  name: string;
  isPressed: boolean;
}

enum RepeatUnit {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

interface IRepeat {
  unit: RepeatUnit;
  interval: number;
  weekDays: WeekDay[];
}

interface IAddTodo {
  clickedPetsId: number[];
  content: string | null;
  tag: ToDoType | null;
  date: string | null;
  isAllDay: boolean;
  color: string;
  isUsingAlarm: boolean;
  repeat: IRepeat | null;
}

const AddTodo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddTodo>>();

  const methods = useForm<IAddTodo>({
    defaultValues: {
      clickedPetsId: [],
      content: null,
      tag: null,
      date: null,
      isAllDay: false,
      color: '#ffffff',
      isUsingAlarm: true,
      repeat: null,
    }
  })

  const { control, handleSubmit, setValue, getValues} = methods;
  const onSubmit = (data: IAddTodo) => console.log(data);

  const { data: pet } = useQuery({
    queryKey: [QueryKey.PET_LIST],
    queryFn: () => PetService.pet.list(),
  });

  const [pets, setPets] = useState<IPet[]>(
    pet?.data?.data.map(({ id, name }: { id: number, name: string }) => ({
      id,
      name,
      isPressed: false,
    })) || []
  );

  const handlePetPress = (id: number) => {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) =>
        pet.id === id ? { ...pet, isPressed: !pet.isPressed } : pet
      );
      const clickedPetsId = updatedPets.filter((pet) => pet.isPressed).map((pet) => pet.id);
      setValue('clickedPetsId', clickedPetsId);  // clickedPetsId 업데이트
      console.log(clickedPetsId);
      return updatedPets;
    });
  };

  const [isTagSelected, setTagSelected] = useState<boolean>(false);

  const TagSelectedInput = () => {
    return (
      <Pressable>
        <Text></Text>
        <View>태그</View>
      </Pressable>
    );
  }

  const [tagWindowSelected, setTagWindowSelected] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderNavigation
          middletitle="일정 추가"
          rightTitle="완료"
          hasBackButton={true}
          onPressBackButton={() => {
              navigation.goBack();
            }}
          onPressRightButton={handleSubmit(onSubmit)}
        />
        <FormProvider {...methods}>
          <View style={[commonStyles.container, {backgroundColor:"white"}]}>
            <View style={[styles.inputWrap, { marginTop: 20 }]}>
              <Text style={styles.label}>펫 선택</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petSelectContainer}>
                {pets.map(({ id, name, isPressed }) => (
                  <Pressable key={id} onPress={() => handlePetPress(id)}>
                    <View style={[styles.pet,  isPressed ? styles.selectedPet : styles.notSelectedPet]}>
                      <Text style={{color: isPressed? "white" : "grey"}}>{name}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>할 일</Text>
              <View style={styles.toDoTitleContainer}>
              <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    isTagSelected ? 
                    <>
                    <Pressable style={{"paddingRight": 200}} onPress={() => {
                      setTagSelected(false);
                      setValue('tag', null);
                    }}>
                      <Text>{getValues('tag')}</Text>
                    </Pressable>
                    <Pressable style={[styles.tagContainer, styles.selectedTag]} onPress={() => setTagWindowSelected(true)}>
                      <Text style={{"color":"white"}}>태그</Text>
                    </Pressable>
                    </> :   
                    <>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        setValue('tag', null);
                      }}
                      placeholder="태그 선택 또는 직접 입력"
                      value={value || ''}
                    />
                    <Pressable style={[styles.tagContainer, styles.notSelectedTag]} onPress={() => setTagWindowSelected(true)}>
                      <Text style={{"color":"white"}}>태그</Text>
                    </Pressable>
                    </>
                  )}
                  name="content"
                />
                <Modal
                animationType="slide"
                visible={tagWindowSelected}
                onRequestClose={() => setTagWindowSelected(!tagWindowSelected)}>
                {
                Object.values(ToDoType).map((tag) => 
                  <Pressable key={tag} onPress={() => {
                    setValue('tag',tag);
                    setValue('content', null);
                    setTagWindowSelected(!tagWindowSelected);
                    setTagSelected(true);
                    }}>
                    <Title text={tag}/>
                  </Pressable>)
                }
                </Modal>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>할 일</Text>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  inputWrap: {
    flex: 1,
    width: "100%",
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  petSelectContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  toDoTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F1F1F1',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
    borderRadius: 15,
  },
  selectedTag: {
    backgroundColor: "black",
  },
  notSelectedTag: {
    backgroundColor: '#D8D8D8',
  },
  pet: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    borderRadius: 40,
    marginTop: 0,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
  },
  selectedPet: {
    backgroundColor: "black",
    borderWidth: 0,
  },
  notSelectedPet: {
    backgroundColor: "white",
  },
  

});
