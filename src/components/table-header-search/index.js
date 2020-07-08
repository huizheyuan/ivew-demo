// <Select>：optionList是选择项，其中包含id和value
// searchData() 函数为搜索函数
// searchHeader 为表头搜索条件对象


const HeaderSearchMixin = {
    methods: {
      renderHeaderInput (h, params) {
        let {key, title} = params.column
        return (
            <Poptip transfer={true}  trigger="hover" placement="bottom">
                <span class="pointer">
                    {title}
                    <Icon type="md-search" size="14" class={this.searchHeader[key] > -1 ? 'on' : ''} />
                </span>
                <Input
                    slot="content"
                    v-model={this.searchHeader[key]}
                    onOn-enter={() => this.searchData()}
                >
                    <template slot="suffix">
                        <Icon  class="pointer" type="ios-search"
                            onclick={() => this.searchData()}
                        />
                        <Icon
                            v-show="value" slot="suffix" type="ios-close-circle-outline" 
                            onclick={() => {
                                if (this.searchHeader[key]!=='') {
                                    this.searchHeader[key] = ''
                                    this.searchData()
                                }
                            }}
                            class="pointer"
                        />
                    </template>
                </Input>
            </Poptip>
        )
      },
      renderHeaderSelect (h, params, optionList) {
        let {title, key} = params.column
        return (
            <span>
                <Poptip transfer={true} trigger="hover" placement="bottom">
                    <span class="pointer">
                        {title}
                        <Icon type="md-search" size="14" class={this.searchHeader[key] ? 'on' : ''} />
                    </span>
                    <Select
                        slot="content"
                        v-model={this.searchHeader[key]}
                        onOn-change={() => this.searchData()}
                    >
                        {optionList.map(item => {
                            return <Option value={item.id} label={item.value} />
                        })}
                    </Select>
                </Poptip >
            </span>
        )
      },
      renderHeaderDatePicker (h, params, datePickerType='date') {
        let {title, key} = params.column
        return (
            <span>
                <Poptip transfer={true} trigger="hover" placement="bottom">
                    <span class="pointer">
                        {title}
                        <Icon type="md-search" size="14" class={this.searchHeader[key] ? 'on' : ''} />
                    </span>
                    <DatePicker 
                        slot="content" 
                        v-model={this.searchHeader[key]}
                        clearable={false}
                        onOn-change={() => this.searchData()}
                        type={datePickerType}
                    />
                </Poptip >
            </span>
        )
      },
    }
}

export {HeaderSearchMixin}