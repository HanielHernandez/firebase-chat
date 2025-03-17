<script setup lang="ts">
import AtText from '@/components/atoms/AtText.vue'
import FrButton from '@/components/forms/FrButton.vue'
import TextField from '@/components/forms/TextField.vue'
import type { MlProfileProps } from './MlProfile.props'
import { ref } from 'vue'
import { Form, type GenericObject } from 'vee-validate'

const { profile } = defineProps<MlProfileProps>()
const emit = defineEmits(['onNameSubmit', 'onEditPictureClick'])

const editName = ref(false)
const initialValues = ref<{ name: string }>({ name: profile.name })

const handleSubmit = (values: GenericObject) => {
    editName.value = false
    emit('onNameSubmit', values)
}

const onEditClick = () => {
    emit('onEditPictureClick')
}
</script>
<template>
    <div>
        <div class="flex flex-col p-4 max-w-96 w-full">
            <div class="relative group w-full mb-4">
                <div
                    role="button"
                    class="flex flex-col cursor-pointer justify-center aspect-square items-center w-full h-full absolute top-0 right-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100"
                    @click="onEditClick"
                >
                    <i class="material-icons text-white">edit</i>
                    <span class="mb-4 text-white font-medium blue">{{ $t('profile.editPicture') }}</span>
                </div>
                <img
                    :src="
                        profile.profileImageUrl
                            ? profile.profileImageUrl
                            : `https://ui-avatars.com/api/?name=${profile.name}`
                    "
                    class="w-full h-full"
                    alt="profile image"
                />
            </div>
            <div class="flex flex-col mb-4 relative group">
                <Form
                    v-if="editName"
                    :initial-values="initialValues"
                    class="flex flex-row flex-nowrap items-center w-full"
                    @submit="handleSubmit"
                >
                    <TextField type="name" name="name" rules="required" class="mr-2" placeholder="Your name" />

                    <FrButton
                        color="default"
                        class="w-10 h-10"
                        rounded
                        type="submit"
                        flat
                        alt="Save Name"
                        @click="editName = true"
                    >
                        <span class="material-icons">check</span>
                    </FrButton>
                </Form>

                <div v-else>
                    <AtText variant="h6" class="leading-6">{{ $t('profile.name') }}</AtText>
                    <AtText class="leading-5">
                        {{ profile.name }}
                    </AtText>
                </div>

                <FrButton
                    v-if="!editName"
                    flat
                    color="default"
                    class="opacity-0 absolute right-0 top-0 group-hover:opacity-100 transition-colors ease-in-out"
                    rounded
                    @click="editName = true"
                >
                    <span class="material-icons">edit</span>
                </FrButton>
            </div>
            <div class="mb-4">
                <AtText variant="h6" class="leading-6">{{ $t('profile.email') }}:</AtText>
                <AtText class="leading-5">
                    {{ profile.email }}
                </AtText>
            </div>
            <div>
                <AtText variant="h6" class="leading-6">{{ $t('profile.phoneNumber') }}:</AtText>
                <AtText class="leading-5">
                    {{ profile.phoneNumber }}
                </AtText>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>
