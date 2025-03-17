<script setup lang="ts">
import MlProfile from '@/components/molecules/MlProfile.vue'
import FrModal from '@/components/modals/FrModal.vue'
import useRootStore from '@/store'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import 'vue-advanced-cropper/dist/style.css'

import { Cropper } from 'vue-advanced-cropper'

const rootStore = useRootStore()
const profilePictureInput = useTemplateRef<HTMLInputElement>('profilePictureInput')
// const profilePicturePath = ref('')
const uploading = ref(false)
const croppingImage = reactive({
    src: '',
    type: 'image/jpg'
})

const userProfile = computed(() => {
    return rootStore.currentUser
})

const showImageModal = ref(false)
const cropper = ref()

/*const onEditModal = () => {
    showImageModal.value = !showImageModal.value
}*/

const onChangePicture = () => {
    profilePictureInput.value?.click()
}

function setprofilePicture(event: Event) {
    if (!event.target) return
    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]
    if (file) {
        const url = URL.createObjectURL(file)
        croppingImage.src = url
        showImageModal.value = true
    }
}

async function cropImage() {
    uploading.value = true
    if (cropper.value) {
        const { canvas } = cropper.value.getResult()
        canvas.toBlob(async (blob: Blob) => {
            try {
                const url = await rootStore.UploadFile(blob as Blob)
                if (!userProfile.value) {
                    return
                }

                if (url !== null && userProfile.value.id) {
                    const updatedProfile = {
                        ...userProfile.value,
                        profileImageUrl: url
                    }
                    await rootStore.updateUser(userProfile.value.id, updatedProfile)
                    rootStore.setCurrentUser(updatedProfile)
                    uploading.value = false
                    onCloseModal()
                }
            } catch (e) {
                console.error(e)
            }
        })
    }
}

function onCloseModal() {
    showImageModal.value = false
    if (profilePictureInput.value) {
        profilePictureInput.value.value = ''
    }
}
</script>
<template>
    <div>
        <MlProfile v-if="userProfile" :profile="userProfile" @on-edit-picture-click="onChangePicture" />
        <input
            ref="profilePictureInput"
            class="invisible"
            type="file"
            name="profilePicture"
            alt="profile-picture"
            @change="setprofilePicture"
        />

        <fr-modal v-model="showImageModal">
            <at-card-container class="relative w-120">
                <fr-button
                    flat
                    rounded
                    color="default"
                    class="absolute top-2 right-2 h-10 w-10 z-80"
                    @click="onCloseModal()"
                >
                    <span class="material-icons text-sm">close</span>
                </fr-button>

                <Cropper
                    ref="cropper"
                    round-result
                    :stencil-props="{
                        aspectRatio: 1 / 1
                    }"
                    class="cropper w-full h-96 mb-4"
                    :src="croppingImage.src"
                />
                <div class="flex flex-row flex-nowrap gap-4 items-center justify-center">
                    <fr-button color="primary" :loading="uploading" @click="cropImage">Aceptar</fr-button>
                    <fr-button color="danger">Cancelar</fr-button>
                </div>
            </at-card-container>
        </fr-modal>
    </div>
</template>
<style lang="scss"></style>
