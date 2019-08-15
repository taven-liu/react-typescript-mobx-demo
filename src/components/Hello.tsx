import * as React from 'react'
import { observer, inject } from 'mobx-react'

import { IRootStoreType } from 'store'
import { HelloStoreType } from 'store/hello'

interface IHelloProps {
  title: string
}

interface IProps extends IHelloProps {
  hello: HelloStoreType
}

const Hello: React.FC<IProps> = ({ title, hello }) => {
  const { count, add, subtract } = hello

  const handleAdd = () => {
    add()
  }

  const handleSubtract = () => {
    subtract()
  }

  return (
    <div style={{ border: '2px solid #ccc', margin: '24px', padding: '10px' }}>
      <h2>{title}</h2>
      <h4>{count}</h4>
      <button onClick={handleAdd} style={{ border: '1px solid #ccc' }}>
        add
      </button>
      <br />
      <br />
      <button onClick={handleSubtract} style={{ border: '1px solid #ccc' }}>
        subtract
      </button>
    </div>
  )
}

export default inject(({ store }) => {
  const { hello }: IRootStoreType = store
  return { hello }
})(observer(Hello)) as React.FunctionComponent<IHelloProps>
