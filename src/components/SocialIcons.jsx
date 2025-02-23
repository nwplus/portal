import React from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from './Icon'

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const DevpostIcon = ({ color }) => (
  <svg width="38" height="34" viewBox="0 0 37 35" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.76277 3.415039L0.759766 19.006L9.76277 34.585H27.7568L36.7598 19.006L27.7568 3.415039H9.76277ZM12.1523 9.54104H18.0728C23.4803 9.54104 27.4868 12.08354 27.4868 19.006C27.4868 25.66 22.6718 28.459 17.8028 28.459H12.1523V9.54104ZM15.9278 13.2145V24.7855H17.7893C21.7583 24.7855 23.5823 22.4605 23.5823 18.994C23.5958 15.1405 21.9383 13.2145 17.9318 13.2145H15.9278Z"
      fill={color}
    />
  </svg>
)

const SOCIAL_ICONS = {
  github: { icon: 'github', brand: true },
  linkedin: { icon: 'linkedin', brand: true },
  instagram: { icon: 'instagram', brand: true },
  website: { icon: 'globe', brand: false },
  devpost: { icon: DevpostIcon, isCustom: true },
}

const SocialIcons = withTheme(({ socialLinks, theme }) => (
  <SocialIconsContainer>
    {Object.entries(socialLinks).map(([platform, link]) => {
      if (!link || !SOCIAL_ICONS[platform]) return null
      const { icon: IconComponent, brand, isCustom } = SOCIAL_ICONS[platform]

      return (
        <a key={platform} href={link} target="_blank" rel="noopener noreferrer">
          {isCustom ? (
            <IconComponent color={theme.colors.text} size="2em" />
          ) : (
            <Icon icon={IconComponent} brand={brand} size="2x" color={theme.colors.text} />
          )}
        </a>
      )
    })}
  </SocialIconsContainer>
))

export default SocialIcons
