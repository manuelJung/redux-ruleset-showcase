import * as React from 'react'
import styled from 'styled-components'
import useUserList from '../hooks/useUserList'

export default function UserList () {
  const userList = useUserList()
  return (
    <Wrapper>
      <div className='title'>
        User-List
      </div>
      <div className='filters'>
        <Filter label='GENDER'>
          <FilterOption
            children='all'
            active={userList.filters.gender === 'all'}
            onClick={() => userList.setGender('all')}
          />
          <FilterOption
            children='female'
            active={userList.filters.gender === 'female'}
            onClick={() => userList.setGender('female')}
          />
          <FilterOption
            children='male'
            active={userList.filters.gender === 'male'}
            onClick={() => userList.setGender('male')}
          />
        </Filter>
        <Filter label='HITS PER PAGE'>
          <input 
            type='number'
            value={userList.filters.numHits}
            onChange={e => userList.setNumHits(parseInt(e.target.value))}
          />
        </Filter>
      </div>
      <div className='hits'>
        {userList.hits && userList.hits.map(user => (
          <div className='hit' key={user.cell}>
            <div className='pic'>
              <img src={user.picture.thumbnail}/>
            </div>
            <div className='description'>
              <div className='name'>
                {user.name.first} {user.name.last}
              </div>
              <div className='gender'>
                {user.gender}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px 10px;
  background: whitesmoke;
  > .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
  }
  > .hits {
    > .hit {
      padding: 10px 0;
      border-bottom: 1px solid grey;
      display: flex;
      > .pic {
        width: 50px;
        height: 50px;
        > img {
          width: 100%; 
          height: 100%;
          border-radius: 5px;
        }
      }
      > .description {
        flex: 1;
        margin-left: 10px;

        > .name {
          font-size: 20px;
          line-height: 30px;
        }
        > .gender {
          font-weight: bold;
        }
      }
    }
  }
`

const Filter = styled.div`
  border: 1px solid grey;
  padding: 10px;
  padding-top: 20px;
  border-radius: 3px;
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

  &:after {
    content: '${props => props.label}';
    position: absolute;
    left: 10px;
    top: -9px;
    padding: 0 10px;
    background: whitesmoke;
  }

  > input {
    font-size: 16px;
    line-height: 25px;
    padding-left: 10px;
    text-align: center;
  }
`

const FilterOption = styled.div`
  color: ${props => props.active ? 'green' : 'black'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  font-size: 18px;
  line-height: 30px;
`