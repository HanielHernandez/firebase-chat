<template>
    <vee-field v-slot="{ errorMessage, value, field }" :name="name" :rules="rules">
        <div class="w-full text-field relative" :class="{ 'text-red-400': !!errorMessage }" v-bind="$attrs">
            <label v-if="title != null" class="block font-medium text-sm mb-1" for="">{{ title }}</label>
            <div class="w-full relative">
                <input
                    :model-value="value"
                    v-bind="field"
                    class="px-4 py-3 w-full border outline-none text-gray-900 bg-neutral-50 rounded transition-colors duration-150 ease-in-out"
                    :class="[
                        !!errorMessage
                            ? 'border-red-400 focus:border-red-600'
                            : 'focus:border-blue-400 border-gray-300',
                        type === 'password' ? 'pr-12' : ''
                    ]"
                    :placeholder="placeholder"
                    :type="currentType"
                    @input="onInputChange"
                />
                <fr-button
                    v-if="type === 'password'"
                    flat
                    rounded
                    color="default"
                    class="cursor-pointer absolute w-7 h-7 text-sm head leading-6 top-2 right-4 !p-0"
                    @click="changeType"
                >
                    <span v-if="currentType === 'password'" class="material-icons !text-md">visibility</span>
                    <span v-else-if="currentType === 'text'" class="material-icons !text-md">visibility_off</span>
                </fr-button>
            </div>

            <p v-if="!!errorMessage && hasErrorSlotPopulate == false" class="text-sm text-red-600 mt-1">
                {{ errorMessage }}
            </p>
            <slot name="error" :error-message="errorMessage"></slot>
        </div>
    </vee-field>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Field as VeeField } from 'vee-validate'
export default defineComponent({
    name: 'TextField',
    components: {
        VeeField
    },
    props: {
        name: {
            type: String,
            default: () => null
        },

        type: {
            type: String,
            default: () => 'text'
        },
        title: {
            type: String,
            default: () => null
        },
        placeholder: {
            type: String,
            default: () => null
        },
        modelValue: {
            type: String || null,
            default: () => null
        },
        rules: {
            type: String,
            default: () => ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        //const value = ref(props.modelValue)
        const hasErrorSlotPopulate = computed(() => {
            return !!slots.error
        })
        const currentType = ref(props.type)

        const changeType = () => {
            currentType.value = currentType.value === 'password' ? 'text' : 'password'
        }

        const onInputChange = (e: InputEvent) => {
            emit('update:modelValue', (e.target as HTMLInputElement).value)
        }

        return { hasErrorSlotPopulate, changeType, currentType, onInputChange }
    }
})
</script>

<style lang="scss">
.text-field {
    &:not(:nth-last-child) {
        margin-bottom: 1rem;
    }
}
</style>
