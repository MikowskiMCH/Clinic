using AutoMapper;
using Clinic.API.DataTransferObjects.Authentication;
using Clinic.API.Models;

namespace Clinic.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<UserForRegister, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}
